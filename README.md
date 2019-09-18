-   Working:
    This project is build on NodeJs typescript.
    Number of products is set in ./src/index.ts at line 29 (`TrendkeeperSingleton.getInstance(10)`) currently it is set at 10.
-   -   Common commands:
    Starting the server: npm run start
        This command transpiles the  code and runs the server locally
    Testing the server: npm run test
        This command runs the test suite for the server
-   -   Interface details:
            Feeds are to be sent to: http://localhost:3000/lido/v1/feed/{product}
                This is a POST request, where {product} is the productId being passed.
            Trending list can be fetched using: http://localhost:3000/lido/v1/trending
                This is a GET request and it will return an object with the current timestamp and an array of trending products.
