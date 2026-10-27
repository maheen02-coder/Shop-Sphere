import Navbar from "../components/Navbar/Navbar";
import CategoryCollection from "../components/CategoryCollection";

export const metadata = {
  title: "Signature Fragrances — ShopSphere",
  description: "Distinctive perfumes and everyday scents from ShopSphere.",
};

export default function FragrancesPage() {
  return (
    <>
      <Navbar />
      <CategoryCollection
        category="Fragrances"
        eyebrow="The Scent Collection"
        title="Signature"
        accent="Fragrances"
        description="Captivating scents with distinctive character — from bright everyday citrus to deep oud for evening wear."
        image="/perfume.jfif"
      />
    </>
  );
}
