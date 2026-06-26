import styles from './Marquee.module.css';

interface MarqueeProps {
  items?: string[];
  separator?: string;
  direction?: 'left' | 'right';
  speed?: number;
}

const DEFAULT_ITEMS = [
  'PHOTOGRAPHIE', '摄影', 'DEVELOPMENT', '代码', 'LUMIÈRE', '影像',
];

export default function Marquee({
  items = DEFAULT_ITEMS,
  separator = '✺',
  direction = 'left',
  speed = 28,
}: MarqueeProps) {
  const content = items.map((item, i) => (
    <span key={i} className={styles.item}>
      {item}
      <span className={styles.separator}>{separator}</span>
    </span>
  ));

  return (
    <div className={styles.container}>
      <div
        className={styles.track}
        style={{
          animation: `${direction === 'left' ? 'marqA' : 'marqB'} ${speed}s linear infinite`,
        }}
      >
        {content}
        {content}
      </div>
    </div>
  );
}
