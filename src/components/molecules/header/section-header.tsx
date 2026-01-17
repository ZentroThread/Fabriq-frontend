type sectionHeaderProps = {
  title: string;
  description?: string;
};

export default function SectionHeader({
  title,
  description,
}: sectionHeaderProps) {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-style mb-4">{title}</h1>

      {description && <p className="text-position-text">{description}</p>}
    </div>
  );
}
