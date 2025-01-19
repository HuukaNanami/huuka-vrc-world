'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ViewStyle } from '@/types/world'

interface FilterBarProps {
  onSearchChange: (value: string) => void
  onTagFilter: (value: string) => void
  onSizeFilter: (value: string) => void
  onRatingFilter: (value: string) => void
  onViewStyleChange: (style: ViewStyle) => void
  viewStyle: ViewStyle
}

export function FilterBar({
  onSearchChange,
  onTagFilter,
  onSizeFilter,
  onRatingFilter,
  onViewStyleChange,
  viewStyle,
}: FilterBarProps) {
  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex flex-col gap-4 py-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="ワールドを検索..."
              className="pl-8"
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <Select onValueChange={onTagFilter} defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="タグでフィルター" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべてのタグ</SelectItem>
              <SelectItem value="nature">自然</SelectItem>
              <SelectItem value="city">都市</SelectItem>
              {/* タグは実際のデータに応じて追加 */}
            </SelectContent>
          </Select>
          <Select onValueChange={onSizeFilter} defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="広さでフィルター" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべてのサイズ</SelectItem>
              <SelectItem value="Small">Small</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Large">Large</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={onRatingFilter} defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="評価でフィルター" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべての評価</SelectItem>
              <SelectItem value="5">★★★★★</SelectItem>
              <SelectItem value="4">★★★★☆以上</SelectItem>
              <SelectItem value="3">★★★☆☆以上</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant={viewStyle === 'compact' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewStyleChange('compact')}
          >
            コンパクト
          </Button>
          <Button
            variant={viewStyle === 'normal' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewStyleChange('normal')}
          >
            標準
          </Button>
          <Button
            variant={viewStyle === 'expanded' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewStyleChange('expanded')}
          >
            詳細
          </Button>
        </div>
      </div>
    </div>
  )
}

