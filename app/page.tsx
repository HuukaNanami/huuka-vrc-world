'use client'

import { useState } from 'react'
import { FilterBar } from '@/components/filter-bar'
import { WorldCard } from '@/components/world-card'
import { VRChatWorld, ViewStyle } from '@/types/world'
import { Button } from '@/components/ui/button'

// ダミーデータ (実際のデータはJSONファイルから読み込む)
const ITEMS_PER_PAGE = 10
const dummyWorlds: VRChatWorld[] = [
  {
    id: 1,
    name: "Nature Valley",
    description: "美しい自然が広がる癒しのワールド",
    link: "vrchat://launch?worldId=wrld_123",
    mainImage: "/placeholder.svg?height=400&width=600",
    subImages: Array(4).fill("/placeholder.svg?height=200&width=200"),
    tags: ["自然", "癒し", "写真撮影"],
    size: "Large",
    rating: 5,
    visited: true,
    updatedAt: "2024-01-19",
    review: "広大な自然の中で、様々な風景を楽しむことができます。"
  },
  // 他のワールドデータ...
]

export default function Home() {
  const [viewStyle, setViewStyle] = useState<ViewStyle>('compact')
  const [searchQuery, setSearchQuery] = useState('')
  const [tagFilter, setTagFilter] = useState('all')
  const [sizeFilter, setSizeFilter] = useState('all')
  const [ratingFilter, setRatingFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  // フィルタリングロジック
  const filteredWorlds = dummyWorlds.filter(world => {
    const matchesSearch = 
      world.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      world.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      world.review.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesTag = tagFilter === 'all' || world.tags.includes(tagFilter)
    const matchesSize = sizeFilter === 'all' || world.size === sizeFilter
    const matchesRating = ratingFilter === 'all' || world.rating >= parseInt(ratingFilter)

    return matchesSearch && matchesTag && matchesSize && matchesRating
  })

  // ページネーション
  const totalPages = Math.ceil(filteredWorlds.length / ITEMS_PER_PAGE)
  const currentWorlds = filteredWorlds.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div className="min-h-screen pb-8">
      <FilterBar
        onSearchChange={setSearchQuery}
        onTagFilter={setTagFilter}
        onSizeFilter={setSizeFilter}
        onRatingFilter={setRatingFilter}
        onViewStyleChange={setViewStyle}
        viewStyle={viewStyle}
      />
      
      <main className="container py-6">
        <div className="grid gap-4">
          {currentWorlds.map((world) => (
            <WorldCard
              key={world.id}
              world={world}
              viewStyle={viewStyle}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              前のページ
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? 'default' : 'outline'}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              次のページ
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}

