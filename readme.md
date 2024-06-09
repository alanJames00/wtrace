# WTrace

WTrace is a robust IP logging and client information tracking service powered by Cloudflare Workers. This service logs IP addresses and other client details, providing valuable insights into web traffic.

## Features

- **IP Logging**: Capture and store IP addresses of incoming requests.
- **GeoIP Information**: Log geographic details such as country, city, and region.
- **User Agent Parsing**: Identify the browser, operating system, and device type from the user-agent string.
- **Request Analysis**: Record request methods (GET, POST, etc.) and URL paths.
- **Referrer Tracking**: Track the origin of requests using the referrer header.
- **Timestamp Logging**: Log the exact time of each request.
- **Rate Limiting and Alerts**: Detect and alert on unusual activity patterns.
- **Blacklist/Whitelist IPs**: Manage access with IP blacklisting and whitelisting.
- **Real-time Dashboard**: Visualize logs with charts and graphs in real-time.
- **Export Data**: Export logs in various formats (CSV, JSON, etc.).
- **Email/SMS Notifications**: Receive alerts for specific events or patterns.
- **Data Retention Policies**: Automatically delete logs after a configurable period.
- **API Access**: Programmatically access logged data through an API.
- **Anomaly Detection**: Identify unusual access patterns using machine learning.
- **Custom Tags/Metadata**: Add custom tags to requests for classification.
- **SSL/TLS Information**: Log details about the SSL/TLS connection.
- **Response Time Logging**: Measure and log request processing times.
- **Data Encryption**: Ensure logs are encrypted in transit and at rest.
- **Integration with Other Services**: Connect with services like Splunk, ELK, and Datadog.
- **User Authentication and Access Control**: Secure the dashboard and API with authentication and role-based access control.
- **Customizable Log Storage**: Choose storage solutions that suit your needs.

## Why wtrace ?

wtrace uses Cloudflare's global network to capture IP addresses and client details accurately. This provides a ton of trustable data. Thanks to the global network, wtrace can handle high traffic volumes and ensure reliable performance. Also identify whether the request is coming from a bot or a human. It can also detect requests originating from TOR network.

## Usage

\*_wtrace_ can be used in two ways:

- **Self-hosted**: You can deploy the Worker script in your Cloudflare account and manage the logs yourself.
- **Trial Version**: You can use the managed Version of wtrace worker

### Self Hosting

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/wtrace.git
   cd wtrace
   ```

2. **Deploy the Worker:**

   - Go to the [Cloudflare dashboard](https://dash.cloudflare.com/).
   - Select your domain.
   - Go to the "Workers" tab.
   - Create a new Worker and copy the script from `src/wtrace.js` into the Worker editor.
   - Save and deploy the Worker.

3. **Set Up KV Storage:**
   - In the Cloudflare dashboard, go to "Workers" -> "KV".
   - Create a new namespace (e.g., `logs`).
   - Bind the namespace to your Worker by clicking on "Settings" -> "Add binding" and selecting the namespace you created.

## Usage

Once the Worker is deployed, it will automatically log IP addresses and other client details for every incoming request. You can view the logs in the Cloudflare Workers KV storage.

## Configuration

To customize the functionality of WTrace, edit the `src/wtrace.js` file. Here, you can add or modify the features according to your requirements.

## Contributing

We welcome contributions! Please fork the repository and submit a pull request with your changes. Ensure your code follows our coding standards and includes appropriate tests.

## License

WTrace is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact

For questions or support, please open an issue in the repository or contact us at support@example.com.
