import React, { useState } from 'react';

interface SearchResult {
    title: string;
    snippet: string;
    url: string;
}

const SearchForm: React.FC = () => {
    const [query, setQuery] = useState('');
    const [sites, setSites] = useState<string[]>([]);
    const [results, setResults] = useState<SearchResult[]>([]);

    const handleCheckboxChange = (site: string) => {
        setSites(prevSites => 
            prevSites.includes(site) ? prevSites.filter(s => s !== site) : [...prevSites, site]
        );
    };

    const performSearch = async () => {
        const response = await fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query, sites })
        });

        const resultData = await response.json();
        setResults(resultData);
    };

    return (
        <div>
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Enter your search term" 
            />
            <div>
                <label>
                    <input 
                        type="checkbox" 
                        value="google" 
                        onChange={() => handleCheckboxChange('google')}
                    />
                    Google
                </label>
                {/* 다른 사이트 추가 체크박스 */}
            </div>
            <button onClick={performSearch}>Search</button>
            <div>
                {results.map((result, index) => (
                    <div key={index}>
                        <h3>{result.title}</h3>
                        <p>{result.snippet}</p>
                        <a href={result.url}>Read more</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchForm;
