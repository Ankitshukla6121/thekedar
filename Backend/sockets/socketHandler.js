
const Bid = require('../models/bid');

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("joinProjectRoom", ({ projectId }) => {
      try {
        socket.join(projectId);
      } catch (err) {
        console.error("Error joining room:", err);
      }
    });

    socket.on("submitBid", async ({ bidData }) => {
      try {
        const bid = new Bid(bidData);
        await bid.save();
        io.to(bid.project.toString()).emit("newBid", bid);
      } catch (err) {
        console.error("Error submitting bid:", err);
      }
    });

    socket.on("counterBid", async ({ bidId, newAmount }) => {
      try {
        const bid = await Bid.findById(bidId);
        if (bid) {
          bid.bidOfferByUser = newAmount;
          await bid.save();
          io.to(bid.project.toString()).emit("counteredBid", bid);
        }
      } catch (err) {
        console.error("Error countering bid:", err);
      }
    });

    socket.on("counterAllBids", async ({ projectId, newAmount }) => {
      try {
        await Bid.updateMany({ project: projectId }, { bidOfferByUser: newAmount });
        const allBids = await Bid.find({ project: projectId });
        io.to(projectId).emit("counteredAllBids", allBids);
      } catch (err) {
        console.error("Error countering all bids:", err);
      }
    });

    socket.on("acceptBidByContractor", async ({ bidId }) => {
      try {
        const bid = await Bid.findById(bidId);
        if (bid) {
          bid.acceptByContractor = true;
          await bid.save();
          io.to(bid.project.toString()).emit("contractorAccepted", bid);
        }
      } catch (err) {
        console.error("Error accepting bid by contractor:", err);
      }
    });

    socket.on("acceptBidByUser", async ({ bidId }) => {
      try {
        const bid = await Bid.findById(bidId);
        if (bid) {
          bid.acceptByUser = true;
          await bid.save();
          io.to(bid.project.toString()).emit("userAccepted", bid);
        }
      } catch (err) {
        console.error("Error accepting bid by user:", err);
      }
    });

    socket.on("finalizeBid", async ({ bidId }) => {
      try {
        const bid = await Bid.findById(bidId);
        if (bid && bid.acceptByUser && bid.acceptByContractor) {
          bid.finalAccept = true;
          bid.finalBid = bid.bidOfferByUser;
          await bid.save();
          io.to(bid.project.toString()).emit("bidFinalized", bid);
        }
      } catch (err) {
        console.error("Error finalizing bid:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};
