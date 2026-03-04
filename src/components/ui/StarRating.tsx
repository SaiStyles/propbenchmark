type Props = {
  rating: number
  size?: number
}

export default function StarRating({ rating, size = 14 }: Props) {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    const fill = Math.min(Math.max(rating - (i - 1), 0), 1)
    const id = `star-grad-${i}-${Math.round(rating * 10)}`
    stars.push(
      <svg
        key={i}
        width={size}
        height={size}
        viewBox="0 0 16 16"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
            <stop offset={`${fill * 100}%`} stopColor="#f59e0b" />
            <stop offset={`${fill * 100}%`} stopColor="rgba(255,255,255,0.1)" />
          </linearGradient>
        </defs>
        <path
          d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.13L8 10.5l-3.71 2.05L5 8.42 2 5.5l4.15-.75z"
          fill={`url(#${id})`}
        />
      </svg>
    )
  }

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
      {stars}
    </span>
  )
}
