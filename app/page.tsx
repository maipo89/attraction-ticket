import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/Search";
import SearchResults from "../components/SearchResults";
import { headers } from "next/headers";
import { Metadata } from "next";

// Handle MetaData 

export async function generateMetadata({ searchParams }: { searchParams: { query?: string } }): Promise<Metadata> {
  const { query } = await searchParams;
  const pageTitle = query
    ? `${query} Attractions | Special Offers`
    : "Special Offers from AttractionTickets.com";
  const metaDescription = query
    ? `Find the best attractions and tickets for ${query} with top deals and offers.`
    : "Explore special offers for attractions and tickets with AttractionTickets.com.";

  return {
    title: pageTitle,
    description: metaDescription,
    keywords: `${query}, attractions, tickets, offers`,
    openGraph: {
      title: pageTitle,
      description: metaDescription,
      url: `https://yourwebsite.com${query ? `?query=${encodeURIComponent(query)}` : ""}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: metaDescription,
    },
  };
}

// Home Component

const Home = async ({ searchParams } : { searchParams: { query?: string } }) => {

  //  Retrieves the user's preferred language from request headers and maps it to a geo-specific code (e.g., 'en', 'de-de', 'en-ie'). 
  //  Defaults to 'en' if no matching language is found.

  const getGeoParam = async () => {
    const headerList = await headers();
    const acceptLanguage = headerList.get("accept-language") ?? 'en'; 
    const lang = acceptLanguage.toLowerCase();
  
    if (lang.startsWith("de")) return "de-de";
    if (lang.startsWith("en-ie")) return "en-ie";
    return "en";
  };
  
  // The geo variable is asynchronously declared before being passed into the SearchResults component to ensure it contains the correct language/region information.
  const geo = await getGeoParam();

  return (
    <main>

      <Header />

      <section>
          {/* Search component: Contains an input field for the user to enter a search query and a method to trigger the search */}
          <Search />
      </section>

      <section>
          {/* Server component that displays results based on the user's query and geo parameter */}
          <SearchResults searchParams={searchParams} geo={geo}/>
      </section>

      <Footer />

    </main>
  );
}

export default Home
