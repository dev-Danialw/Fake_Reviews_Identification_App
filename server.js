const os = require("os");
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

const networkInterfaces = os.networkInterfaces();
let IP_ADDRESS = "";

// Loop through network interfaces to find a suitable IPv4 address
for (const interfaceName in networkInterfaces) {
  const interfaceArray = networkInterfaces[interfaceName];
  for (const interfaceDetail of interfaceArray) {
    if (interfaceDetail.family === "IPv4" && !interfaceDetail.internal) {
      IP_ADDRESS = interfaceDetail.address;
      break;
    }
  }
  if (IP_ADDRESS) {
    break;
  }
}

if (!IP_ADDRESS) {
  console.error("Unable to determine the local IP address.");
  process.exit(1);
}

const PORT = 5000;

server.listen(PORT, IP_ADDRESS, () => {
  console.log(`JSON Server is running at http://${IP_ADDRESS}:${PORT}`);
});
