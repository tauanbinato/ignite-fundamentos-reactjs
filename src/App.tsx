import { Header } from './components/header'
import { Post } from './components/Post'
import { Sidebar } from './components/Sidebar';

import './global.css'
import styles from './App.module.css';

const posts = [
  {
    id: 1,
    author: { 
      avatarUrl: 'https://github.com/tauanbinato.png',
      name: 'Tauan Binato',
      role: 'CTO Minha empresa' 
    },
    content: [
      { type: 'paragraph', content: 'Alou alou!' },
      { type: 'paragraph', content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor optio vel laudantium dolorem sapiente possimus, accusantium ipsum nihil, voluptates dicta laboriosam quos quam quae nemo quasi.' },
      { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2023-02-02 20:00:00')
  },
  {
    id: 2,
    author: { 
      avatarUrl: 'https://github.com/maykbrito.png',
      name: 'Maykon',
      role: 'Rocketseat' 
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraaa' },
      { type: 'paragraph', content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor optio vel laudantium dolorem sapiente possimus, accusantium ipsum nihil, voluptates dicta laboriosam quos quam quae nemo quasi.' },
      { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2023-02-01 20:00:00')
  },
]

export function App() {
  return (
    <div>
      <Header/>
      
      <div className={styles.wrapper}>
        <Sidebar/>

        <main>
          {
            posts.map((post, key) => {
              return (
                <Post
                  key={post.id}
                  author={post.author}
                  content={post.content}
                  publishedAt={post.publishedAt}
                />
              )
            })
          }
        </main>
        
      </div>
      
      
    </div>
    
  )
}

