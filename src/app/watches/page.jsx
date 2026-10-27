import Navbar from "../components/Navbar/Navbar";
import CategoryCollection from "../components/CategoryCollection";

export const metadata = {
  title: "Premium Watches — ShopSphere",
  description: "Smart and classic timepieces curated by ShopSphere.",
};

export default function WatchesPage() {
  return (
    <>
      <Navbar />
      <CategoryCollection
        category="Watches"
        eyebrow="Time & Craft"
        title="Premium"
        accent="Watches"
        description="Timepieces that bring together style and precision, from everyday smartwatches to refined classics."
        image="/watches.jpg"
      />
    </>
  );
}
