const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);

// Custom route to handle POST requests
server.post("/analyze", (req, res) => {
  // You can access the URL from req.body.url
  const { url } = req.body;

  const mockReviewData = [
    {
      id: Date.now() + 3,
      is_ecommerce: true,
      fake_percentage: 0.25,
      real_percentage: 99.75,
      reviews_count: 200,
      message: "Reviews scraped successfully",
    },
    {
      id: Date.now() + 4,
      is_ecommerce: false,
      fake_percentage: 10.0,
      real_percentage: 90.0,
      reviews_count: 50,
      message: "Reviews scraped successfully",
    },
  ];

  // Choose a random index to simulate different responses
  const randomIndex = Math.floor(Math.random() * mockReviewData.length);
  const reviewData = mockReviewData[randomIndex];

  // Introduce a 4-second delay using setTimeout
  setTimeout(() => {
    // Update the data in db.json
    const urls = router.db.get("urls");
    urls.push({ url, reviewDataId: reviewData.id });
    router.db.get("reviewData").push(reviewData).write();

    // Send the random review data object as the response
    res.json(reviewData);
  }, 4000); // 4000 milliseconds (4 seconds)
});
server.use(middlewares);
server.use(router);

const IP_ADDRESS = "192.168.10.5"; // Replace with your actual local IP address
const PORT = 3001;

server.listen(PORT, IP_ADDRESS, () => {
  console.log(`JSON Server is running at http://${IP_ADDRESS}:${PORT}`);
});
