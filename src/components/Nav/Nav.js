import { Router } from 'preact-router'

const InnerNav = ({ id, edit, scenes }) => {
  const current = parseInt(id) || 1
  const isFirst = current === 1
  const last = Object.keys(scenes).length
  const isLast = current === last
  const s = edit ? '/edit' : ''
  return (
    <div>
      { !isFirst && <a href={`/1${s}`}>first</a> }
      { !isFirst && <a href={`/${current - 1}${s}`}>previous</a> }
      { !isLast && <a href={`/${current + 1}${s}`}>next</a> }
      { !isLast && <a href={`/${last}${s}`}>last</a> }
    </div>
  )
}

const Nav = ({ scenes }) => (
  <Router>
    <InnerNav path=':id?/:edit?' scenes={scenes} />
  </Router>
)

export default Nav
