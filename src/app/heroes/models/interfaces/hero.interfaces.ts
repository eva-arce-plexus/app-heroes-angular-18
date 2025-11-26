export interface Hero {
  /** Unique hero ID (e.g., "batman") */
  id: string;

  /** Main image name (e.g., "dc-batman") or null */
  img: string | null;

  /** Superhero name (e.g., "Batman") */
  superhero: string;

  /** Publisher name (e.g., "DC Comics") */
  publisher: string;

  /** Hero's alter ego (e.g., "Bruce Wayne") */
  alter_ego: string;

  /** First comic appearance (e.g., "Detective Comics #27") */
  first_appearance: string;

  /** Alternative image URL or null */
  alt_img: string | null;
}
