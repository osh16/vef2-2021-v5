
// TODO sækja Sass

export function Layout({children}) {
  return (
    <div>
      <title>RUV Frettir</title>
      <main>
        <h1>RUV Frettir</h1>
        {children}
      </main>
      <footer>
        <a href="https://www.ruv.is/frettir">Frettir fra RUV</a>
      </footer>
    </div>
  )
  // TODO setja upp layout fyrir vef
}
