import { TextLink } from '../ui'

export default function ArticleCard({ post }) {
  return (
    <article className="rounded-[28px] bg-white p-6 shadow-sm">
      <img src={post.image} alt={post.imageAlt} className="mb-5 h-44 w-full rounded-[24px] object-cover" />
      <span className="pill pill--sage">{post.category}</span>
      <h3 className="t-h3 mt-4 text-forest">{post.headline}</h3>
      <p className="mt-3 text-faint">{post.excerpt}</p>
      <div className="mt-6">
        <TextLink href={`/resources/${post.slug}`}>Read article</TextLink>
      </div>
    </article>
  )
}
