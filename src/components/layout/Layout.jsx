import s from './Layout.module.scss'

export function Layout({children}) {
  return (
    <div className={s.container}>
      <header className={s.container__header}>
        <h1>RUV Frettir</h1>
      </header>
      <main className={s.container__main}>
        {children}
      </main>
      <footer className={s.container__footer}>
        <a href="https://www.ruv.is/frettir">Frettir fra RUV</a>
      </footer>
    </div>
  )
}
