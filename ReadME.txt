Product Search Application - Documentation


This application is a Next.js-based product search page that integrates with the ATD Travel API to fetch and display attraction ticket offers. It follows server-side rendering (SSR) for improved SEO and performance. The UI is styled using SCSS, aligned with the AttractionTickets.com brand.

Features & Approach
The product search app meets the requirements of the technical test by implementing the following:

✅ Search Functionality

1) A text field allows users to input a search query.
2) The query is submitted and updates the URL dynamically.
3) The API request includes the title (query) and geo (language/region code) parameters, plus limit and offset.

✅ Fetching Data from the API

The application makes an API request to:

https://global.atdtravel.com/api/products?geo=<region>&title=<query>&limit=<limit>&offset=<offset>

The API response includes metadata for pagination and product details such as:

Product ID
Title
Destination
Image
Prices (Adult & Child)

Results are displayed in a grid scss template.

✅ Server-Side Rendering (SSR) for SEO & Performance

Home and SearchResults are server components.
Fetching data on the server prevents client-side rendering delays.
This also improves SEO, as search engines can crawl pre-rendered pages.

✅ Pagination Handling

By default, 10 results are displayed.
Pagination is implemented when more than 10 results exist.
Users can navigate through pages using Next & Previous buttons.
Example URL with pagination:

/?query=madrid&page=2

✅ Dynamic Meta Tags & Title for SEO

The generateMetadata function dynamically updates:

1) Title: ${query} Attractions | Special Offers
2) Meta Description: Find the best attractions and tickets for ${query} with top deals and offers
3) Open Graph / Twitter Meta Tags to enhance social sharing.

✅ Geo Parameter Handling

The geo parameter is determined from the user's Accept-Language header.

Supports:

en → UK
en-ie → Ireland
de-de → Germany

Example:
https://global.atdtravel.com/api/products?geo=en&title=london


✅ Installation & Setup

1)Requirements

Node.js 18+
Yarn (recommended) or npm

Steps to Run Locally
1) Clone the Repository
2) cd <project-folder>

Install Dependencies:

yarn install

Run the Development Server:

yarn dev

Open http://localhost:3000 in your browser to see the app.



If integrating into an existing system rather than building from scratch, the approach would differ:

✅ For Drupal/Symfony:

Implement the search functionality as a RESTful API endpoint.
Use Symfony HTTP Client or Drupal's JSON API module to fetch data.
Convert the Next.js search components into reusable Twig templates for Drupal or Symfony.

✅ For Next.js App:

Fully server-rendered (SSR) approach for better performance.
No backend needed, API calls are directly handled in server components.
Testing Strategy (Future Implementation)
Currently, testing is not implemented, but I plan to use Jest for unit testing.

✅ Testing Tools to Use:

Jest → Unit testing for functions like generateMetadata().

Future Improvements

✅ Implement Jest & React Testing Library for testing.
✅ Add loading states while fetching data.