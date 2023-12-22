import * as React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/layout.js';
import { StaticImage } from 'gatsby-plugin-image';
import { imageWrapper } from '../styles/index.module.css';

export default function IndexPage() {
  const data = useStaticQuery(graphql`
    query GetBlogPosts {
      allMdx(sort: { fields: frontmatter___date, order: DESC }) {
        nodes {
          frontmatter {
            title
            description
            date(fromNow: true)
          }
          id
          slug
        }
      }
    }
  `);

  const posts = data.allMdx.nodes;

  return (
    <Layout>
      <div className={imageWrapper}>
        <StaticImage
          src="../images/ivana-la-61jg6zviI7I-unsplash.jpg"
          alt="a cogi stting on a bed."
          placeholder="dominantColor"
          width={300}
          height={300}
        />
      </div>
      <h1>Home page</h1>
      <Link to="/about">About this site</Link>

      <h2>Check out my recent blog posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={post.slug}>{post.frontmatter.title}</Link>{' '}
            <small>posted {post.frontmatter.date}</small>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
