import type { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-screen-xl mx-auto border border-slate-400">
      {children}
    </div>
  )
}

export default Layout
