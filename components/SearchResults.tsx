const SearchResults = async ({ searchParams, geo }: { searchParams: { query?: string, page?: string }, geo: string }) => {
    
    // Await Params, since is async
    const params = await searchParams;
    const  pageData = await params.page;
    const  query = await params.query;

    // Calculate pagination parameters: page, limit, and offset for API results
    const page = parseInt(pageData as string) || 1;
    const limit = 10; // Number of results per page
    const offset = (page - 1) * limit;

    // If the query is empty, show "Please Enter a search query"
    if (!query) {
       return   <div className="search-results">
                   <div className="search-results-before">
                       <p>Please enter a search query.</p>
                    </div>
                </div>;
    }

    // API call using fetch to retrieve products based on query, geo, and pagination parameters.
    // cache: "no-store" ensures fresh data on every request.
    let data = [];
    let meta = { total_count: 0 };

    try {
        const res = await fetch(`https://global.atdtravel.com/api/products?geo=${geo}&title=${query}&limit=${limit}&offset=${offset}`, {
        cache: "no-store",
        });
        const responseJson = await res.json();
        data = responseJson.data || [];
        meta = responseJson.meta || { total_count: 0 };
    } catch (err) {
        console.error("Error fetching search results:", err);
    }

    // Structured Data
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": data && Array.isArray(data) ? data.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `https://yourwebsite.com/product/${item.id}`,
            "name": item.title,
            "image": item.img_sml,
            "priceCurrency": "GBP",
            "price": item.price_from_adult === "0.00" ? "0.00" : item.price_from_adult,
            "itemOffered": {
            "@type": "Product",
            "name": item.title,
            "description": item.dest,
            "priceCurrency": "GBP",
            "price": item.price_from_adult === "0.00" ? "0.00" : item.price_from_adult
            }
        })) : []
    };

    const structuredDataJSON = JSON.stringify(structuredData);
  
    return (
      <div className="search-results">
        {data && data.length > 0 ? (
            <h1>Special Offers from AttractionTickets.com</h1>
        ) : null}

        {/* Structured Data: Add JSON-LD to the page head */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredDataJSON }}></script>

        {/* Check if data exists and has results, then map over the data to display each attraction */}
        {data && data.length > 0 ? (
          data.map((item: any) => (
            <div key={item.id} className="search-results__card">
              <div className="search-results__image">
                <img src={item.img_sml} alt={item.title} loading="lazy"/>
                <div className="search-results__image__tag">
                    {item.price_from_adult === "0.00" ? (
                    <>
                        <p>Free</p>
                    </>
                    ) : 
                    <>
                        <p>From £{item.price_from_adult}</p>
                    </>
                    }
                </div>
              </div>
              <div className="search-results__info">
                    <h2>{item.title}</h2>
                    <div className="search-results__info__dest">
                        <p>{item.dest}</p> {/* Show the destination of the attraction */}
                    </div>
              </div>

              {/* Show adult/child price (or 'Free' if the price is 0) */}
              <div className="search-results__price">
                    {item.price_from_adult === "0.00" ? (
                    <>
                        <p>Adult Price:</p>
                        <h3>Free</h3>
                    </>
                    ) : 
                    <>
                        <p>Adult From:</p>
                        <h3>£{item.price_from_adult}<strong> per day</strong></h3>
                    </>
                    }
                    {item.price_from_child ? (
                        item.price_from_child === "0.00" ? (
                            <>
                            <p>Child Price:</p>
                            <h3>Free</h3>
                            </>
                        ) : (
                            <>
                            <p>Child From:</p>
                            <h3>£{item.price_from_child}<strong> per day</strong></h3>
                            </>
                        )
                    ) : null}
              </div>
            </div>
          )) 
        ) : (
        <div className="search-results-empty"><p>No results found</p></div> 
        )}

        {/* Handle Pagination */}
        {meta && meta.total_count > limit && (
        <div className="search-results-pagination">
          <div className="search-results-pagination__container">
            {page > 1 && (
                <a href={`/?query=${encodeURIComponent(query)}&page=${page - 1}`}>{'<'}</a>
            )}
            <span>{page}</span>
            {page * limit < meta.total_count && (
                <a href={`/?query=${encodeURIComponent(query)}&page=${page + 1}`}>{'>'}</a>
            )}
          </div>
        </div>
        
      )}
      </div>
    );
  };
  
  export default SearchResults;