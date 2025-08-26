// 简单的API测试脚本
async function testAPI() {
  try {
    console.log("Testing API endpoint...");

    const response = await fetch("http://localhost:3000/api/project/projects");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ API is working!");
    console.log(`📊 Found ${data.length} projects`);
    console.log(
      "📋 Projects:",
      data.map((p) => p.title)
    );
  } catch (error) {
    console.log("❌ API test failed:", error.message);
    console.log(
      "💡 Make sure to start the mock server with: npm run mock-server"
    );
  }
}

// 如果直接运行此脚本
if (typeof window === "undefined") {
  const fetch = require("node-fetch");
  testAPI();
} else {
  // 在浏览器中运行
  testAPI();
}
