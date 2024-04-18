import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { Button, PanelBody, Panel } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import deleteIcon from './delete.svg';

import './editor.scss';


export default function Edit(props) {

	const [arr, setArr] = useState(props.attributes.content)

	const updateHeadline = (e, index) => {
		const content = props.attributes.content;
		const updated = { ...content[index], headline: e }
		const list = [...content];
		list[index] = updated;
		setArr(list);

		props.setAttributes({ content: list });
	}



	const updateContent = (e, index) => {
		const content = props.attributes.content;
		const updated = { ...content[index], content: e }
		const list = [...content];
		list[index] = updated;
		setArr(list);

		props.setAttributes({ content: list });
	}


	const addFaq = () => {
		const array = props.attributes.content;
		const emptyFAQ = {
			headline: '',
			content: ''
		}

		props.setAttributes({ content: [...array, { ...emptyFAQ }] });
	}


	const deleteFaq = (i) => {
		setArr(arr => {
			return arr.filter((item, index) => index !== i)
		})

		props.setAttributes({ content: arr });
	}

	const blockProps = useBlockProps({
		className: 'faq-wrapper noSpaceBefore',
	});

	return (
		<section {...blockProps}>

			<InspectorControls>
				<Panel>
					<PanelBody>
						<Button className='is-primary' onClick={addFaq}>Add FAQ</Button>
					</PanelBody>
				</Panel>
			</InspectorControls>

			<RichText
				tagName="h2"
				value={props.attributes.headline}
				onChange={(content) => props.setAttributes({ headline: content })}
				placeholder='Overskrift'
			>
			</RichText>

			{props.attributes.content.length == 0 &&
				<>
					<Button className='is-primary' onClick={addFaq}>Add First FAQ</Button>
				</>
			}

			{props.attributes.content.map((_item, index) => {
				return (
					<div className="faq-item">
						<Button className="delete-faq" onClick={() => deleteFaq(index)}><img src={deleteIcon} /></Button>
						<RichText
							tagName="h4"
							value={props.attributes.content[index].headline}
							onChange={(content) => updateHeadline(content, index)}
							placeholder='Overskrift'
						>
						</RichText>
						<RichText
							tagName='p'
							value={props.attributes.content[index].content}
							onChange={(content) => updateContent(content, index)}
							placeholder='Content'
						>
						</RichText>
					</div>
				)
			})}
		</section>
	);
}
