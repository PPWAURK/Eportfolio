import MagneticWrapper from '@/components/MagneticWrapper';
import styles from './page.module.css';

export default function CVPage() {
  return (
    <div className={styles.sheet}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <div className={styles.name}>王世洪</div>
          <div className={styles.subtitle}>全栈开发者 · 风光摄影 · Développeur full-stack · Full-stack Developer</div>
          <div className={styles.contactLine}>巴黎 Paris · wangshihong2333@gmail.com · github.com/Paneed</div>
        </div>
        <MagneticWrapper>
          <a href="/cv.pdf" download className={styles.downloadBtn}>
            导出 PDF / Télécharger ↓
          </a>
        </MagneticWrapper>
      </div>

      {/* Body */}
      <div className={styles.body}>
        {/* Left column */}
        <div className={styles.leftCol}>
          <div className={styles.sectionTitle}>专长 · Expertise</div>
          <div className={styles.entryList}>
            <div className={styles.entry}>
              <div className={styles.entryLabel}>全栈 / Dev</div>
              <div>
                <div className={styles.entryTitle}>全栈开发 · Full-stack</div>
                <div className={styles.entrySub}>前端 · 后端 · 数据库 · 运维</div>
                <div className={styles.entryDesc}>独立完成从前端、后端到数据库设计与部署运维的完整项目，注重工程质量与性能。</div>
              </div>
            </div>
            <div className={styles.entry}>
              <div className={styles.entryLabel}>应用 / App</div>
              <div>
                <div className={styles.entryTitle}>应用软件开发 · Applications</div>
                <div className={styles.entrySub}>Web &amp; 软件 · 数据库管理</div>
                <div className={styles.entryDesc}>构建可用、可维护的应用软件，负责数据库管理与项目长期运维。</div>
              </div>
            </div>
          </div>

          <div className={`${styles.sectionTitle} ${styles.sectionTitleSpaced}`}>教育 · Formation</div>
          <div className={styles.entryList}>
            <div className={styles.entry}>
              <div className={styles.entryLabel}>在读 / En cours</div>
              <div>
                <div className={styles.entryTitle}>网络工程硕士 (M1)</div>
                <div className={styles.entrySub}>Master 1 Ingénierie Réseau · Université Paris Cité</div>
              </div>
            </div>
            <div className={styles.entry}>
              <div className={styles.entryLabel}>已获 / Obtenu</div>
              <div>
                <div className={styles.entryTitle}>计算机科学 学士</div>
                <div className={styles.entrySub}>Licence Informatique · Université Paris Cité</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className={styles.rightCol}>
          <div className={styles.sectionTitle}>技能 · Compétences</div>

          <div className={styles.skillGroupTitle}>摄影 / Photographie</div>
          <div className={styles.skillTags}>
            <span className={styles.skillTag}>风光 / Paysage</span>
            <span className={styles.skillTag}>旅行 / Voyage</span>
            <span className={styles.skillTag}>后期 LR</span>
            <span className={styles.skillTag}>构图 / Compo</span>
          </div>

          <div className={styles.skillGroupTitle}>开发 / Développement</div>
          <div className={styles.skillTags}>
            <span className={styles.skillTag}>全栈开发</span>
            <span className={styles.skillTag}>应用开发</span>
            <span className={styles.skillTag}>数据库管理</span>
            <span className={styles.skillTag}>项目运维</span>
          </div>

          <div className={styles.sectionTitle}>语言 · Langues</div>
          <div className={styles.langList}>
            <div className={styles.langRow}>
              <span className={styles.langName}>中文 / Chinois</span>
              <span className={styles.langLevel}>母语 · Natif</span>
            </div>
            <div className={styles.langRow}>
              <span className={styles.langNameEn}>English / Anglais</span>
              <span className={styles.langLevel}>B2</span>
            </div>
            <div className={styles.langRow}>
              <span className={styles.langNameEn}>Français / 法语</span>
              <span className={styles.langLevel}>母语 · Natif</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
