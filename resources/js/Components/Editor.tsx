import { cn } from '@/Lib/utils'
import { useForm } from '@inertiajs/react'
import { ImageIcon, Smile } from 'lucide-react'
import Quill, { QuillOptions } from 'quill'
import { Delta, Op } from 'quill/core'
import 'quill/dist/quill.snow.css'
import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { MdSend } from 'react-icons/md'
import { PiTextAa } from 'react-icons/pi'
import EmojiPopover from './EmojiPopover'
import Hint from './Hint'
import { Button } from './Ui/button'

type EditorValue = {
  image: File | null
  body: string
}

type Props = {
  variant?: 'create' | 'edit'
  onSubmit: ({ image, body }: EditorValue) => void
  onCancel?: () => void
  placeholder?: string
  defaultValue?: Delta | Op[]
  disabled?: boolean
  innerRef?: MutableRefObject<Quill | null>
}

const Editor = ({
  variant = 'create',
  onSubmit,
  onCancel,
  placeholder = 'Write something...',
  defaultValue = [],
  disabled = false,
  innerRef,
}: Props) => {
  const { data, setData, post, processing, reset } = useForm({
    text: '',
  })

  const [isToolbarVisible, setIsToolbarVisible] = useState(true)

  const isEmpty = data.text.trim().length === 0

  const toggleToolbar = () => {
    setIsToolbarVisible(current => !current)

    const toolbarElement = containerRef.current?.querySelector('.ql-toolbar')
    if (toolbarElement) {
      toolbarElement.classList.toggle('hidden')
    }
  }

  const onEmojiSelect = (emoji: any) => {
    const quill = quillRef.current

    quill?.insertText(quill.getSelection()?.index || 0, emoji.native)
  }

  const submitRef = useRef(onSubmit)
  const placeholderRef = useRef(placeholder)
  const quillRef = useRef<Quill | null>(null)
  const defaultValueRef = useRef(defaultValue)
  const containerRef = useRef<HTMLDivElement>(null)
  const disabledRef = useRef(disabled)

  useLayoutEffect(() => {
    submitRef.current = onSubmit
    placeholderRef.current = placeholder
    defaultValueRef.current = defaultValue
    disabledRef.current = disabled
  })

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement('div'),
    )

    const options: QuillOptions = {
      theme: 'snow',
      placeholder: placeholderRef.current,
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['link'],
          [{ list: 'ordered' }, { list: 'bullet' }],
        ],
        keyboard: {
          bindings: {
            enter: {
              key: 'Enter',
              handler: () => {
                //TODO: submit form
                return
              },
            },
            shift_enter: {
              key: 'Enter',
              shiftKey: true,
              handler: () => {
                quill.insertText(quill.getSelection()?.index || 0, '\n')
              },
            },
          },
        },
      },
    }

    const quill = new Quill(editorContainer, options)
    quillRef.current = quill
    quillRef.current.focus()

    if (innerRef) {
      innerRef.current = quill
    }

    quill.setContents(defaultValueRef.current)
    setData('text', quill.getText())

    quill.on(Quill.events.TEXT_CHANGE, () => {
      setData('text', quill.getText())
    })

    return () => {
      quill.off(Quill.events.TEXT_CHANGE)

      if (container) {
        container.innerHTML = ''
      }

      if (quillRef.current) {
        quillRef.current = null
      }

      if (innerRef) {
        innerRef.current = null
      }
    }
  }, [innerRef])

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col overflow-hidden rounded-md border border-slate-200 bg-white transition focus-within:border-slate-300 focus-within:shadow-sm'>
        <div ref={containerRef} className='ql-custom h-full' />

        <div className='z-[5] flex px-2 pb-2'>
          <Hint
            label={isToolbarVisible ? 'Hide formatting' : 'Show formatting'}
          >
            <Button
              size='iconSm'
              variant='ghost'
              onClick={toggleToolbar}
              disabled={disabled}
            >
              <PiTextAa className='size-4' />
            </Button>
          </Hint>

          <EmojiPopover onEmojiSelect={onEmojiSelect}>
            <Button size='iconSm' variant='ghost' disabled={disabled}>
              <Smile className='size-4' />
            </Button>
          </EmojiPopover>

          {variant === 'create' && (
            <Hint label='Image'>
              <Button
                size='iconSm'
                variant='ghost'
                onClick={() => {}}
                disabled={disabled}
              >
                <ImageIcon className='size-4' />
              </Button>
            </Hint>
          )}

          {variant === 'edit' && (
            <div className='ml-auto flex items-center gap-x-2'>
              <Button
                variant={'outline'}
                size={'sm'}
                onClick={() => {}}
                disabled={disabled}
              >
                Cancel
              </Button>

              <Button
                disabled={disabled || isEmpty}
                isLoading={processing}
                size={'sm'}
                onClick={() => {}}
                className='bg-[#007a5a] text-white hover:bg-[#007a5a]/80'
              >
                Save
              </Button>
            </div>
          )}

          {variant === 'create' && (
            <Button
              disabled={disabled || isEmpty}
              isLoading={processing}
              size={'iconSm'}
              className={cn(
                'ml-auto',
                isEmpty
                  ? 'bg-white text-muted-foreground hover:bg-white'
                  : 'bg-[#007a5a] text-white hover:bg-[#007a5a]/80',
              )}
              onClick={() => {}}
            >
              <MdSend className='size-4' />
            </Button>
          )}
        </div>
      </div>

      <div
        className={cn(
          'flex justify-end p-2 text-[10px] text-muted-foreground opacity-0 transition',
          !isEmpty && 'opacity-100',
        )}
      >
        <p>
          <strong>Shift + Return</strong> to add a new line
        </p>
      </div>
    </div>
  )
}

export default Editor
