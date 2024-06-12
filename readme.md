# WTrace

WTrace is a robust IP logging and client information tracking service powered by Cloudflare Workers. This service logs IP addresses and other client details, providing valuable insights into web traffic.

## Features

- **IP Logging**: Capture and store IP addresses of incoming requests.
- **GeoIP Information**: Log geographic details such as country, city, and region.
- **User Agent Parsing**: Identify the browser, operating system, and device type from the user-agent string.
- **Request Analysis**: Record request methods (GET, POST, etc.) and URL paths.
- **Referrer Tracking**: Track the origin of requests using the referrer header.
- **Timestamp Logging**: Log the exact time of each request.
- **Data Retention Policies**: Automatically delete logs after a configurable period.
- **API Access**: Programmatically access logged data through an API.
- **SSL/TLS Information**: Log details about the SSL/TLS connection.
- **Response Time Logging**: Measure and log request processing times.
- **User Authentication and Access Control**: Secure the dashboard and API with authentication and role-based access control.

## Why wtrace ?

wtrace uses Cloudflare's global network to capture IP addresses and client details accurately. This provides a ton of trustable data. Thanks to the global network, wtrace can handle high traffic volumes and ensure reliable performance. Also identify whether the request is coming from a bot or a human. It can also detect requests originating from TOR network.

## Usage

\*_wtrace_ can be used in two ways:

- **Self-hosted**: You can deploy the Worker script in your Cloudflare account and manage the logs yourself.
- **Trial Version**: You can use the managed Version of wtrace worker

### Self Hosting

1. **Clone the repository:**

   ```bash
   git clone https://github.com/alanJames00/wtrace
   cd wtrace
   ```

2. **Deploy the Worker:**

   - Install the [Wrangler CLI](https://developers.cloudflare.com/workers/cli-wrangler/install-update).
   - Authenticate Wrangler with your Cloudflare account using `wrangler login`.
   - Edit the `wrangler.toml` file and add your Cloudflare account ID along with the required resources.
   - Deploy the Worker using `wrangler publish`.

### API Usage

1. **Register Username**:

- Route: `/register`
- Method: `POST`
- Body: `{"username": "your_username"}`
- Response:
  ```json
  {
  	"info": "user created",
  	"apiKey": "cb463902-aeraer7c9-8050-***********"
  }
  ```

2. **Obtain Refer ID**:

- Route: `/referId`
- Method: `POST`
- header: `x-auth-key` : `apiKey`
- Response:

```json
{
	"referId": "98DT2AAC",
	"info": "testuser1"
}
```

3. **View Logs By Refer ID**:

- Route: `/requests/referId/:referId`
- Method: `GET`
- header: `x-auth-key` : `apiKey`
- url-params: `referId`

4. **View Refer IDs By Username**:

- Route: `/referIds`
- Method: `GET`
- header: `x-auth-key` : `apiKey`
