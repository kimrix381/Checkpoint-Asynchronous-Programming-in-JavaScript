async function iterateWithAsyncAwait(values) {
  for (const value of values) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(value);
  }
}

// Example usage:
iterateWithAsyncAwait([1, 2, 3, 4]);

async function fakeApiCall(success = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve("Fetched data successfully!");
      } else {
        reject(new Error("API call failed"));
      }
    }, 1500);
  });
}

async function awaitCall() {
  try {
    const response = await fakeApiCall(true); // change to false to simulate error
    console.log(response);
  } catch (error) {
    console.error("Oops! Something went wrong:", error.message);
  }
}

// Example usage:
awaitCall();

async function concurrentRequests() {
  const apiCall1 = fakeApiCall(true);
  const apiCall2 = fakeApiCall(true);

  try {
    const [res1, res2] = await Promise.all([apiCall1, apiCall2]);
    console.log("Results from concurrent calls:", res1, res2);
  } catch (error) {
    console.error("Error in concurrent requests:", error.message);
  }
}

// Example usage:
concurrentRequests();

async function fetchFromUrl(url) {
  return new Promise((resolve) => {
    const delay = Math.floor(Math.random() * 2000) + 1000; // Random delay between 1-3 seconds
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, delay);
  });
}

async function parallelCalls(urls) {
  try {
    const fetchPromises = urls.map((url) => fetchFromUrl(url));
    const results = await Promise.all(fetchPromises);
    console.log("Parallel fetch results:");
    results.forEach((result) => console.log(result));
  } catch (error) {
    console.error("Failed to fetch one or more URLs:", error.message);
  }
}

// Example usage:
parallelCalls([
  "https://api.example.com/data1",
  "https://api.example.com/data2",
  "https://api.example.com/data3",
]);
