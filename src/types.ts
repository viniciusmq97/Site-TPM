export type Tag = {
  id: string
  nome: string
  descricao: string
}

export type Perfil = {
  id: string
  username: string
  bio: string
  avatar_url: string
  role: 'criador' | 'instrutor' | 'aluno'
}

export type UsuarioAutenticado = {
  id: string
  username: string
  role: 'criador' | 'instrutor' | 'aluno'
}

export type Postagem = {
  id: string
  author_id: string
  title: string
  content: string
  media_urls: string[]
  tags: Tag[]
  criada_em: string
  atualizada_em: string
  tipo: 'tutorial' | 'artigo' | 'evento' | 'pergunta'
}

export type Comentario = {
  id: string
  post_id: string
  author_id: string
  parent_id: string | null
  content: string
  votes_count: number
  criado_em: string
}

export type LinhaComentario = Comentario & {
  replies: LinhaComentario[]
}

export type TipoVoto = 'up' | 'down'

export type Voto = {
  user_id: string
  post_id?: string | null
  comment_id?: string | null
  vote_type: TipoVoto
}
