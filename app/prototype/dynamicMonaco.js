import dynamic from 'next/dynamic'
import styles from './page.module.css'

const DynamicIFrame = dynamic(() => (
  Promise.resolve(() => <iframe src="/index.html" width="100%" height="100%" />)
), {
  ssr: false  // Diese Zeile stellt sicher, dass das iframe nur auf der Clientseite geladen wird
})

function DynamicMonaco() {
  return (
    <div id="editor" className={styles.editor}>
      <DynamicIFrame />
    </div>
  )
}

export default DynamicMonaco;