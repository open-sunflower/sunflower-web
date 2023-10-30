import Login from './login'
import ThemeToggle from './theme-toggle'

export default function Header() {
  return (
    <header className="p-4 flex w-full border">
      <div className="flex w-full lg:w-1/2 mx-auto">
        <div className="basis-1/2 flex items-center justify-start">
          <Login />
        </div>
        <div className="basis-1/2 flex items-center justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
