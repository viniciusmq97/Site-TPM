import { useMemo, useState } from 'react'
import { ArrowDown, ArrowUp, MessageCircle } from 'lucide-react'
import type { LinhaComentario } from '../types'

export type ModoFiltro = 'hot' | 'new' | 'top'

export type ResumPostagem = {
  id: string
  title: string
  excerpt: string
}

type PropsNoComentario = {
  comment: LinhaComentario
  profundidade?: number
  podeResponder?: boolean
  aoResponder: (comentario: LinhaComentario) => void
  aoVotar: (idComentario: string, tipo: 'up' | 'down') => void
}

export function NoComentario({ comment, profundidade = 0, podeResponder = false, aoResponder, aoVotar }: PropsNoComentario) {
  const [estaBuscandoResponder, setEstaBuscandoResponder] = useState(false)
  const [contagemVotos, setContagemVotos] = useState(comment.votes_count)

  const profundidadeVisual = Math.min(profundidade, 3)
  const espaçamentoLinha = useMemo(() => ({ paddingLeft: `${profundidadeVisual * 1.5}rem` }), [profundidadeVisual])

  const tratarVoto = (tipo: 'up' | 'down') => {
    setContagemVotos((atual) => atual + (tipo === 'up' ? 1 : -1))
    aoVotar(comment.id, tipo)
  }

  return (
    <div className="relative mb-6" style={espaçamentoLinha}>
      {profundidade > 0 && <span className="absolute left-0 top-2 h-[calc(100%-0.25rem)] w-px bg-slate-700" />}

      <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5 shadow-xl shadow-black/10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="rounded-full bg-slate-800 px-2 py-1 uppercase tracking-[0.18em] text-[11px] text-slate-500">{comment.author_id}</span>
              <span className="inline-flex items-center gap-1 text-slate-500">
                <MessageCircle size={14} /> {profundidade === 0 ? 'Comentário raiz' : `Resposta nível ${profundidade}`}
              </span>
            </div>
            <p className="mt-3 text-slate-100 leading-7">{comment.content}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 rounded-3xl border border-slate-800 bg-slate-900 px-3 py-2 text-slate-300">
            <button type="button" className="inline-flex items-center gap-2 text-sm hover:text-brand" onClick={() => tratarVoto('up')}>
              <ArrowUp size={16} /> Upvote
            </button>
            <span className="text-sm font-semibold text-slate-100">{contagemVotos}</span>
            <button type="button" className="inline-flex items-center gap-2 text-sm hover:text-red-400" onClick={() => tratarVoto('down')}>
              <ArrowDown size={16} /> Downvote
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-400">
          <button 
            type="button" 
            disabled={!podeResponder}
            className="rounded-full border border-slate-800 bg-slate-900/80 px-3 py-2 transition hover:border-brand hover:text-white disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={() => { setEstaBuscandoResponder((atual) => !atual); aoResponder(comment) }}>
            Responder
          </button>
          <span>{comment.replies.length} respostas</span>
        </div>

        {estaBuscandoResponder && (
          <div className="mt-4 rounded-3xl border border-slate-800 bg-slate-950/90 p-4">
            <p className="text-sm text-slate-300">Escreva sua resposta técnica no editor à direita.</p>
          </div>
        )}
      </div>

      {comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((resposta) => (
            <NoComentario key={resposta.id} comment={resposta} profundidade={profundidade + 1} podeResponder={podeResponder} aoResponder={aoResponder} aoVotar={aoVotar} />
          ))}
        </div>
      )}
    </div>
  )
}
