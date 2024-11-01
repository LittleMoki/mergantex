'use client'
import { Editor } from '@tinymce/tinymce-react'
import { useRef } from 'react'

export default function CustomEditor({ value, fn, id }) {
	const editorRef = useRef(null)

	return (
		<Editor
			id={id}
			apiKey='mpidl86gcxjmuv61ojtq1j6tjqxl1m3alistg7tzarhol6lh'
			onInit={(_evt, editor) => (editorRef.current = editor)}
			init={{
				width: '100%',
				min_height: 600,
				selector: `textarea#${id}`,
				plugins:
					'anchor autolink charmap codesample emoticons code link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
				toolbar:
					'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',

				content_style:
					'body { font-family: Helvetica, Arial, sans-serif; font-size: 16px; direction: ltr; }',
			}}
			value={value}
			onEditorChange={fn}
		/>
	)
}
