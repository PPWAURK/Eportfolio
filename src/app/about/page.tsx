import ScrambleText from '@/components/ScrambleText';
import Marquee from '@/components/Marquee';
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.tag}>关于我 · À propos · About</div>
        <h1 className={styles.title}>
          <ScrambleText text="ABOUT" />
        </h1>
        <div className={styles.grid}>
          {/* Left column - sticky */}
          <div className={styles.leftCol}>
            <div className={styles.portrait}>
              <div className={styles.portraitLabel}>PORTRAIT · 替换为你的照片</div>
            </div>
            <div className={styles.stats}>
              <div>
                <div className={styles.statValue}>M1</div>
                <div className={styles.statLabel}>网络安全 / Cybersécurité</div>
              </div>
              <div>
                <div className={`${styles.statValue} ${styles.statValueSm}`}>Paris</div>
                <div className={styles.statLabel}>常驻 / Basé à</div>
              </div>
              <div>
                <div className={`${styles.statValue} ${styles.statValueLg}`}>3</div>
                <div className={styles.statLabel}>语言 / langues</div>
              </div>
            </div>
          </div>

          {/* Right column - content */}
          <div className={styles.rightCol}>
            <p className={styles.bioCn}>
              我是王世洪（Shihong），一名全栈开发者，巴黎西岱大学（Université Paris Cité）计算机 BUT 毕业，现 M1 网络安全工程师（alternance）。多年的开发经验让我能独立完成从前端、后端到数据库与运维的完整项目。工作之外，我是一名风光摄影爱好者，喜欢在旅途中记录自然的光线与地貌。
            </p>
            <p className={styles.bioEn}>
              I&apos;m Shihong Wang — a full-stack developer in Paris, graduate of a Computer Science BUT from Université Paris Cité, currently pursuing an M1 in Cybersecurity (work-study). My experience lets me carry projects end to end: frontend, backend, databases and ops. Off the clock, I&apos;m a landscape photographer chasing natural light on the road.
            </p>
            <p className={styles.bioFr}>
              Développeur full-stack à Paris, diplômé d&apos;un BUT Informatique de l&apos;Université Paris Cité, en M1 Cybersécurité en alternance. Je mène les projets de bout en bout, du frontend à l&apos;ops, et je photographie les paysages en voyage.
            </p>

            <div className={styles.approachHeader}>怎么工作 · Approche</div>
            <div className={styles.approachList}>
              <div className={styles.approachItem}>
                <span className={styles.approachNum}>01</span>
                <div>
                  <div className={styles.approachTitle}>先看，再拍 / Observer</div>
                  <div className={styles.approachDesc}>每个项目都从观察开始 —— 理解场景、光和人，再决定按下快门或写下第一行代码。</div>
                </div>
              </div>
              <div className={styles.approachItem}>
                <span className={styles.approachNum}>02</span>
                <div>
                  <div className={styles.approachTitle}>克制即风格 / Restraint</div>
                  <div className={styles.approachDesc}>少即是多。删掉多余的元素，让光、留白和节奏自己说话。</div>
                </div>
              </div>
              <div className={styles.approachItem}>
                <span className={styles.approachNum}>03</span>
                <div>
                  <div className={styles.approachTitle}>交付到底 / Ship it</div>
                  <div className={styles.approachDesc}>从想法到成片、从原型到上线 —— 我对最终的完成度负责。</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills marquee */}
      <div className={styles.skillsMarquee}>
        <Marquee
          items={['Lightroom', 'React', 'Capture One', 'TypeScript', 'Figma', 'Three.js', '暗房']}
          speed={30}
        />
      </div>
    </>
  );
}
