import { useMemo, useState } from 'react'
import { LogIn, LogOut, MessageSquare, Tag, Filter } from 'lucide-react'
import { NoComentario } from './components/CommentNode'
import type { Postagem, Tag as TagType, UsuarioAutenticado, LinhaComentario } from './types'
import type { ModoFiltro } from './components/CommentNode'

// Dados de exemplo com tags
const tags: TagType[] = [
  { id: 't1', nome: 'Tutoriais', descricao: 'Guias passo a passo' },
  { id: 't2', nome: 'Ferramentas', descricao: 'Dicas sobre software e ferramentas' },
  { id: 't3', nome: 'Photoshop', descricao: 'Conteúdo relacionado a Photoshop' },
  { id: 't4', nome: 'After Effects', descricao: 'Dicas de animação e efeitos' },
  { id: 't5', nome: 'Premiere', descricao: 'Edição de vídeo com Premiere' },
  { id: 't6', nome: 'Áudio', descricao: 'Produção e edição de áudio' },
  { id: 't7', nome: 'Design', descricao: 'Design gráfico e web' },
  { id: 't8', nome: 'Eventos', descricao: 'Eventos do curso' },
]

const postagens: Postagem[] = [
  {
    id: 'p1',
    author_id: 'u1',
    title: 'Tutorial Básico: Camadas no Photoshop',
    content: 'Aprenda como trabalhar com camadas, uma das funcionalidades mais importantes do Photoshop. Vamos cobrir criação, organização e fusão de camadas.',
    media_urls: [],
    tags: [tags[1], tags[2]],
    criada_em: '2026-04-07',
    atualizada_em: '2026-04-07',
    tipo: 'tutorial'
  },
  {
    id: 'p2',
    author_id: 'u2',
    title: 'Animações com After Effects - Guia Iniciante',
    content: 'Descubra como criar suas primeiras animações usando After Effects. Desde keyframes até efeitos de transição.',
    media_urls: [],
    tags: [tags[0], tags[3]],
    criada_em: '2026-04-06',
    atualizada_em: '2026-04-06',
    tipo: 'tutorial'
  },
  {
    id: 'p3',
    author_id: 'u3',
    title: 'Evento: Workshop de Multimídia - Abril 2026',
    content: 'Próximo sábado teremos um workshop presencial abordando as principais técnicas de design e edição. Inscrições abertas!',
    media_urls: [],
    tags: [tags[7]],
    criada_em: '2026-04-05',
    atualizada_em: '2026-04-05',
    tipo: 'evento'
  },
  {
    id: 'p4',
    author_id: 'u4',
    title: 'Edição de Vídeo com Premiere - Fluxo de Trabalho Profissional',
    content: 'Confira uma abordagem profissional para editar vídeos com Premiere. Aprenda sobre organização de projetos, efeitos e exportação.',
    media_urls: [],
    tags: [tags[0], tags[4]],
    criada_em: '2026-04-04',
    atualizada_em: '2026-04-04',
    tipo: 'tutorial'
  },
  {
    id: 'p5',
    author_id: 'u5',
    title: 'Técnicas Avançadas de Design Gráfico',
    content: 'Explorar técnicas avançadas de design que podem elevar seus projetos. Tipografia, composição e uso de cores.',
    media_urls: [],
    tags: [tags[6], tags[2]],
    criada_em: '2026-04-03',
    atualizada_em: '2026-04-03',
    tipo: 'artigo'
  }
]

const comentariosRaiz: LinhaComentario[] = [
  {
    id: 'c1',
    post_id: 'p1',
    author_id: 'u2',
    parent_id: null,
    content: 'Ótimo tutorial! As explicações sobre camadas ficaram muito claras.',
    votes_count: 5,
    criado_em: '2026-04-07T10:30:00Z',
    replies: [
      {
        id: 'c2',
        post_id: 'p1',
        author_id: 'u1',
        parent_id: 'c1',
        content: 'Obrigado! Fico feliz que tenha gostado. Tem alguma dúvida específica sobre as técnicas?',
        votes_count: 2,
        criado_em: '2026-04-07T11:00:00Z',
        replies: []
      }
    ]
  }
]

export default function App() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState<UsuarioAutenticado | null>(null)
  const [tagSelecionada, setTagSelecionada] = useState<string | null>(null)
  const [idPostagemSelecionada, setIdPostagemSelecionada] = useState<string | null>(null)
  const [alvoResposta, setAlvoResposta] = useState<string | null>(null)

  const postagensFiltradas = useMemo(() => {
    if (!tagSelecionada) return postagens
    return postagens.filter(post => post.tags.some(tag => tag.id === tagSelecionada))
  }, [tagSelecionada])

  const postagemAtual = idPostagemSelecionada ? postagens.find(p => p.id === idPostagemSelecionada) : null

  const handleLogin = () => {
    setUsuarioAutenticado({
      id: 'u_atual',
      username: 'João Silva',
      role: 'aluno'
    })
  }

  const handleLogout = () => {
    setUsuarioAutenticado(null)
  }

  const handleResponder = (comentario: LinhaComentario) => {
    console.log('Responder em', comentario.id)
  }

  const handleVotar = (idComentario: string, tipo: 'up' | 'down') => {
    console.log('Votou', tipo, 'em', idComentario)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-slate-900">Portal Multimídia</h1>
              <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
                <a href="#curso" className="hover:text-slate-900 transition">Curso</a>
                <a href="#eventos" className="hover:text-slate-900 transition">Eventos</a>
                <a href="#sobre" className="hover:text-slate-900 transition">Sobre</a>
              </nav>
            </div>
            <button onClick={usuarioAutenticado ? handleLogout : handleLogin} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
              {usuarioAutenticado ? <LogOut size={18} /> : <LogIn size={18} />}
              {usuarioAutenticado ? 'Sair' : 'Entrar'}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1">
            <div className="sticky top-24 space-y-4">
              {usuarioAutenticado && (
                <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                  <p className="text-sm font-medium text-slate-900">{usuarioAutenticado.username}</p>
                  <p className="text-xs text-slate-500">{usuarioAutenticado.role}</p>
                </div>
              )}

              <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Filter size={18} className="text-slate-600" />
                  <h2 className="font-medium text-slate-900">Categorias</h2>
                </div>
                <div className="space-y-2">
                  <button onClick={() => setTagSelecionada(null)} className={`w-full text-left px-3 py-2 rounded-lg transition ${ tagSelecionada === null ? 'bg-blue-100 text-blue-900 font-medium' : 'text-slate-700 hover:bg-slate-100' }`}>
                    Todas as categorias
                  </button>
                  {tags.map(tag => (
                    <button key={tag.id} onClick={() => setTagSelecionada(tag.id)} className={`w-full text-left px-3 py-2 rounded-lg transition ${ tagSelecionada === tag.id ? 'bg-blue-100 text-blue-900 font-medium' : 'text-slate-700 hover:bg-slate-100' }`}>
                      <div className="flex items-center gap-2">
                        <Tag size={14} />
                        <span>{tag.nome}</span>
                      </div>
                      <p className="text-xs text-slate-500 ml-6">{tag.descricao}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <main className="md:col-span-3">
            {!postagemAtual ? (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                  {tagSelecionada ? `Postagens em "${tags.find(t => t.id === tagSelecionada)?.nome}"` : 'Últimas Postagens'}
                </h2>
                {postagensFiltradas.map(postagem => (
                  <article key={postagem.id} onClick={() => setIdPostagemSelecionada(postagem.id)} className="p-6 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-slate-900">{postagem.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${ postagem.tipo === 'tutorial' ? 'bg-green-100 text-green-800' : postagem.tipo === 'artigo' ? 'bg-blue-100 text-blue-800' : postagem.tipo === 'evento' ? 'bg-purple-100 text-purple-800' : 'bg-yellow-100 text-yellow-800' }`}>
                        {postagem.tipo === 'tutorial' ? 'Tutorial' : postagem.tipo === 'artigo' ? 'Artigo' : postagem.tipo === 'evento' ? 'Evento' : 'Pergunta'}
                      </span>
                    </div>
                    <p className="text-slate-700 mb-4 line-clamp-2">{postagem.content}</p>
                    <div className="flex flex-wrap gap-2">
                      {postagem.tags.map(tag => (
                        <span key={tag.id} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">#{tag.nome}</span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-3">{postagem.criada_em}</p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <button onClick={() => setIdPostagemSelecionada(null)} className="text-blue-600 hover:text-blue-700 font-medium">
                  ← Voltar para feed
                </button>

                <article className="p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">{postagemAtual.title}</h2>
                  <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
                    <span>{postagemAtual.criada_em}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${ postagemAtual.tipo === 'tutorial' ? 'bg-green-100 text-green-800' : postagemAtual.tipo === 'artigo' ? 'bg-blue-100 text-blue-800' : postagemAtual.tipo === 'evento' ? 'bg-purple-100 text-purple-800' : 'bg-yellow-100 text-yellow-800' }`}>
                      {postagemAtual.tipo === 'tutorial' ? 'Tutorial' : postagemAtual.tipo === 'artigo' ? 'Artigo' : postagemAtual.tipo === 'evento' ? 'Evento' : 'Pergunta'}
                    </span>
                  </div>
                  <p className="text-stone-700 leading-relaxed mb-4">{postagemAtual.content}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {postagemAtual.tags.map(tag => (
                      <span key={tag.id} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded">#{tag.nome}</span>
                    ))}
                  </div>
                </article>

                <section className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <MessageSquare size={20} />
                    Discussão
                  </h3>

                  {usuarioAutenticado ? (
                    <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <textarea placeholder="Adicione um comentário..." className="w-full p-3 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 resize-none" rows={3} />
                      <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Publicar</button>
                    </div>
                  ) : (
                    <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200 text-center text-slate-600">
                      Faça login para participar da discussão
                    </div>
                  )}

                  <div className="space-y-4">
                    {comentariosRaiz.map(comentario => (
                      <NoComentario
                        key={comentario.id}
                        comment={comentario}
                        podeResponder={usuarioAutenticado !== null}
                        aoResponder={handleResponder}
                        aoVotar={handleVotar}
                      />
                    ))}
                  </div>
                </section>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
