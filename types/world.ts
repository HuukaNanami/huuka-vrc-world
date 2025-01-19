export interface VRChatWorld {
  id: number;
  name: string;
  description: string;
  link: string;
  mainImage: string;
  subImages: string[];
  tags: string[];
  size: 'Small' | 'Medium' | 'Large';
  rating: number;
  visited: boolean;
  updatedAt: string;
  review: string;
}

export type ViewStyle = 'compact' | 'normal' | 'expanded';

