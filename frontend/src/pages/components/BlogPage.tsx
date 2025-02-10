import { useState, useEffect } from "react";
import BlogList from "./BlogList";
import SearchBar from "./search";
import { Cheerio } from "cheerio";
function BlogPage() {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        const fetchBlogs = async () => {
           try {
        const response = await fetch("https://gnews.io/api/v4/search?q=technology&lang=en&token=8bcc177a2da61f8fd6f16b4f335e3562");
        const data = await response.json();

               const blogs = data.articles.map((article) => {
                   return ({
                       id: article.publishedAt,
                       Title: article.title,
                       Author: article.source.name,
                       Content: article.Content,
                    //    Url: article.url,
                   })
               });

        setBlogs(blogs);
    } catch (error) {
        console.log("Error fetching blogs:", error);
    }
        }
        fetchBlogs()
    }, [])
    return (<>
        <div className="SearchAndList">
            <SearchBar blogs={blogs} setBlogs={setBlogs}></SearchBar>
            <BlogList blogs={blogs} setBlogs={setBlogs}></BlogList>
        </div>
    </>)
}
export default BlogPage;
