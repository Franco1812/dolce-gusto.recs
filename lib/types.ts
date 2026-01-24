export interface Capsule {
  id: string;
  name: string;
  description: string | null;
  category: string;
  intensity: number | null;
  image_url: string | null;
  created_at: string;
}

export interface ListItem {
  id: string;
  capsule_id: string;
  status: 'pending' | 'tried';
  created_at: string;
  capsule?: Capsule;
}

export interface Review {
  id: string;
  capsule_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  capsule?: Capsule;
}

export interface CapsuleWithStatus extends Capsule {
  list_item?: ListItem;
  review?: Review;
}
