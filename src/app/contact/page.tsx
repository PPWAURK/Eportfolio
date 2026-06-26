'use client';

import { useState, type FormEvent } from 'react';
import styles from './page.module.css';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL = 'wangshihong2333@gmail.com';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      showToast('已复制 ✓ Copié');
    } catch {
      showToast(EMAIL);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || name.trim().length < 2) {
      setErrorMsg('姓名至少 2 个字符');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setErrorMsg('请输入有效的邮箱地址');
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setErrorMsg('消息至少 10 个字符');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || '提交失败，请稍后重试');
        setStatus('error');
        return;
      }
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setErrorMsg('网络错误，请稍后重试');
      setStatus('error');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div>
          <div className={styles.tag}>联系 · Contact · 一起做点东西</div>
          <h1 className={styles.title}>
            勾搭一下
            <br />
            <span className={styles.titleSub}>Travaillons ensemble.</span>
          </h1>

          {/* Email display + copy */}
          <div className={styles.emailRow}>
            <span className={styles.emailAddr} onClick={copyEmail}>
              {EMAIL}
            </span>
            <button className={styles.copyBtn} onClick={copyEmail}>
              复制 / Copier
            </button>
          </div>

          {/* Contact form */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">姓名 / Nom</label>
              <input
                id="name"
                className={styles.input}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="你的名字"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">邮箱 / Email</label>
              <input
                id="email"
                className={styles.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="message">消息 / Message</label>
              <textarea
                id="message"
                className={styles.textarea}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="说说你的想法..."
                rows={5}
              />
            </div>

            {errorMsg && <div className={styles.error}>{errorMsg}</div>}
            {status === 'success' && (
              <div className={styles.success}>消息已发送 ✓ Message envoyé</div>
            )}

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? '发送中...' : '发送 / Envoyer'}
            </button>
          </form>
        </div>

        {/* Contact cards grid */}
        <div className={styles.cards}>
          <a
            href="https://www.instagram.com/wsh.photo/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <div className={styles.cardLabel}>风光摄影 / Photo</div>
            <div className={styles.cardTitle}>Instagram ↗</div>
            <div className={styles.cardSub}>@wsh.photo</div>
          </a>
          <a
            href="https://github.com/Paneed"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <div className={styles.cardLabel}>代码 / Code</div>
            <div className={styles.cardTitle}>GitHub ↗</div>
            <div className={styles.cardSub}>/Paneed</div>
          </a>
          <a href={`mailto:${EMAIL}`} className={styles.card}>
            <div className={styles.cardLabel}>邮件 / Email</div>
            <div className={styles.cardTitle}>Email ↗</div>
            <div className={styles.cardSubEmail}>{EMAIL}</div>
          </a>
          <div className={`${styles.card} ${styles.cardStatic}`}>
            <div className={styles.cardLabel}>状态 / Statut</div>
            <div className={styles.cardStatus}>● 可接单</div>
            <div className={styles.cardSub}>通常 24h 内回复 · Réponse sous 24h</div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <span>巴黎 · Paris · France · GMT+1</span>
          <span>© 2026 王世洪</span>
        </div>
      </div>

      {/* Toast */}
      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
}
