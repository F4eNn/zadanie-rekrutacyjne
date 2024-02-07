/** @format */

import { ChangeEvent, SetStateAction, useRef, useState, Dispatch, DragEvent } from 'react';
//@ts-expect-error svgr error
import Delete from '../../assets/delete-icon.svg?react';

type FileInputProps = {
	handleSetFile: Dispatch<SetStateAction<File | string>>;
	thisFileName: File;
};
export const FileInput = ({ handleSetFile, thisFileName }: FileInputProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isOver, setIsOver] = useState(false);

	const onChangeInputfile = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		handleSetFile(e.target.files[0]);
	};

	const deleteFile = () => {
		handleSetFile('');
	};
	
	const handleDragOver = (event: DragEvent) => {
		event.preventDefault();
		setIsOver(true);
	};

	const handleDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		handleSetFile(event.dataTransfer.files[0]);
		setIsOver(false);
	};
	return (
		<div className='bg-white flex relative overflow-hidden max-h-[96px] justify-center items-center rounded-lg mt-9'>
			{thisFileName.name ? (
				<span className='flex justify-center items-center p-10 gap-3'>
					{thisFileName.name}{' '}
					<button
						onClick={deleteFile}
						className='fill-darkBlue  hover:fill-red transition-colors duration-200'>
						<Delete />
					</button>
				</span>
			) : (
				<div
					onDrop={handleDrop}
					onDragOver={handleDragOver}
					onDragLeave={() => setIsOver(false)}
					className={`bg-white h-[96px] w-full flex justify-center items-center ${
						isOver ? 'border-dashed border-purple border-[5px]' : ''
					}`}>
					{isOver ? (
						<span className='text-lg font-[500] text-purple'>Drop Here</span>
					) : (
						<div className='flex justify-center gap-1'>
							<button
								type='button'
								onClick={() => fileInputRef.current?.click()}
								className='cursor-pointer  '>
								<span className='text-purple  underline underline-offset-4'>Upload a file</span>
							</button>
							<span> or drag and drop here</span>
						</div>
					)}
				</div>
			)}

			<input
				id='file'
				ref={fileInputRef}
				type='file'
				hidden
				onChange={onChangeInputfile}
			/>
		</div>
	);
};
