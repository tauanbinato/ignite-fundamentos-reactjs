import styles from './Post.module.css';
import { PencilLine } from 'phosphor-react'
import { Comment } from './Comment';
import { Avatar } from './Avatar';
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';


// Estado = variáveis que eu quero que o componente monitore

interface Author {
  name: string;
  role: string;
  avatarUrl: string
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
}

export function Post({ author, content, publishedAt } : PostProps) {

  const [comments, setComments] = useState([]);

  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormated = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, { 
    locale: ptBR,
    addSuffix: true
  });

  function handlePublishNewComment(event: FormEvent)  {
    event.preventDefault();

    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  function deleteComment(commmentToDelete: string) {

    const commentsWithoutDeletedOne = comments.filter(comment => comment !== commmentToDelete);
    setComments([...commentsWithoutDeletedOne]);
  }

  function handleInvalidComment(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Este campo é obrigatório');
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>

          <Avatar src={author.avatarUrl} />

          <div className={styles.authorInfo}>
            <strong> {author.name} </strong>
            <span>{author.role} </span>
          </div>

        </div>

        <time title={publishedDateFormated} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {
          content.map(line => {
            if (line.type === 'paragraph') {
              return <p key={line.content}>{line.content}</p>
            } 
            else if (line.type === 'link') {
              return <p key={line.content}><a href=''>{line.content}</a></p>
            }
          })
        }
      </div>

      <form onSubmit={handlePublishNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name='comment'
          placeholder='Deixe um comentario'
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleInvalidComment}
          required
        />
        
        <footer>
          <button type='submit' disabled={isNewCommentEmpty}> Publicar </button>
        </footer>
        
      </form>

      <div className={styles.commentList}>
        { 
          comments.map((comment, i) => {
            return (
              <Comment
                key={i}
                content={comment}
                onDeleteComment={deleteComment}
              />
            )
          }) 
        }
      </div>
    </article>
  );
}