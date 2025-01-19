'use client'

import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Star } from 'lucide-react'
import { VRChatWorld, ViewStyle } from '@/types/world'

interface WorldCardProps {
  world: VRChatWorld
  viewStyle: ViewStyle
}

export function WorldCard({ world, viewStyle }: WorldCardProps) {
  const renderRating = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
        />
      ))
  }

  if (viewStyle === 'compact') {
    return (
      <Card className="hover:bg-accent/50 transition-colors">
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <CardTitle className="text-base">{world.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">{renderRating(world.rating)}</div>
                <Badge variant="outline">{world.size}</Badge>
              </div>
            </div>
            {world.visited && (
              <Badge variant="secondary">訪問済み</Badge>
            )}
          </div>
        </CardHeader>
      </Card>
    )
  }

  if (viewStyle === 'normal') {
    return (
      <Card className="hover:bg-accent/50 transition-colors">
        <CardHeader className="p-4">
          <div className="flex items-start gap-4">
            <Image
              src={world.mainImage || "/placeholder.svg"}
              alt={world.name}
              width={120}
              height={120}
              className="rounded-md object-cover"
            />
            <div className="flex-1">
              <CardTitle className="text-lg">{world.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {world.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {world.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">{renderRating(world.rating)}</div>
                <Badge variant="outline">{world.size}</Badge>
                {world.visited && (
                  <Badge variant="secondary">訪問済み</Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
          <CardHeader className="p-4">
            <div className="flex items-start gap-4">
              <Image
                src={world.mainImage || "/placeholder.svg"}
                alt={world.name}
                width={200}
                height={200}
                className="rounded-md object-cover"
              />
              <div className="flex-1">
                <CardTitle className="text-xl">{world.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  {world.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {world.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex">{renderRating(world.rating)}</div>
                  <Badge variant="outline">{world.size}</Badge>
                  {world.visited && (
                    <Badge variant="secondary">訪問済み</Badge>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="grid grid-cols-4 gap-2">
              {world.subImages.slice(0, 4).map((image, index) => (
                <Image
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`${world.name} - ${index + 1}`}
                  width={100}
                  height={100}
                  className="rounded-md object-cover"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{world.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Image
            src={world.mainImage || "/placeholder.svg"}
            alt={world.name}
            width={800}
            height={400}
            className="rounded-lg object-cover w-full"
          />
          <div className="grid grid-cols-3 gap-2">
            {world.subImages.map((image, index) => (
              <Image
                key={index}
                src={image || "/placeholder.svg"}
                alt={`${world.name} - ${index + 1}`}
                width={300}
                height={300}
                className="rounded-md object-cover"
              />
            ))}
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">概要</h3>
            <p className="text-muted-foreground">{world.review}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

