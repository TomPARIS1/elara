async function searchPage({
        searchParams,
    } : {
        searchParams: {
            query: string;
        };
    }) {

    const { query } = await searchParams;

    return (
        <div>searchPage for {query}</div>
    )
}

export default searchPage