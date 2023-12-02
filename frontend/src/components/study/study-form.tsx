import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import clsx from "clsx";

import ReactQuill, { Quill } from "react-quill";
import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats";

import { TagsInput } from "react-tag-input-component";

import { Switch } from "@headlessui/react";

import "./custom-quill.css";
import "./tag-input.css";

import { MyStudyFormData } from "../../types/interface";

import { useMyStudyPostMutation } from "../../hooks/use-study";
import useEditor from "../../hooks/use-editor";
import {
  previewModalState,
  usePreviewModal,
} from "../../hooks/use-preview-modal";

interface StudyFormProps {
  myStudyData: MyStudyFormData;
  setMyStudyData: Dispatch<SetStateAction<MyStudyFormData>>;
}

// quill 초기화
Quill.register("modules/imageActions", ImageActions);
Quill.register("modules/imageFormats", ImageFormats);

const StudyForm: React.FC<StudyFormProps> = ({
  myStudyData,
  setMyStudyData,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
    setValue,
  } = useForm<MyStudyFormData>({
    defaultValues: myStudyData,
  });

  const btnName = myStudyData.title ? "수정하기" : "저장하기";
  const [contentsValue, setContentsValue] = useState("");

  const editorRef = useRef(null);
  const { modules, formats } = useEditor(editorRef);

  const mutation = useMyStudyPostMutation();
  const onSubmit = async (data: MyStudyFormData) => {
    console.log(data);

    // const test = mutation.mutate(data);
    // console.log(test);
  };

  // 미리보기 데이터 input
  const title = watch("title");
  const tagList = watch("tagList");
  const content = watch("content");
  const isAlram = watch("isAlram");

  useEffect(() => {
    setMyStudyData({ content, title, tagList, isAlram });
  }, [title, tagList, isAlram, setMyStudyData, content]);

  // 미리보기 오픈
  const { onOpen } = usePreviewModal();

  return (
    <div className="my-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            className="w-full text-center text-2xl py-2 px-2 outline-none bg-transparent border-primary
          sm:text-left
          focus:ring-2 focus:ring-primary focus:rounded-md
          "
            placeholder="제목을 입력해 주세요"
            {...register("title", {
              required: "닉네임을 입력해 주세요",
              minLength: {
                value: 3,
                message: "최소 3글자 이상 입력해야 합니다.",
              },
            })}
          />
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.title?.message}
            </span>
          </label>
        </div>
        <div
          className="flex justify-center my-4
        sm:justify-start
        "
        >
          <TagsInput
            value={tagList}
            placeHolder="태그를 입력하세요"
            {...(register("tagList"), {})}
            onChange={(tags) => {
              setValue("tagList", tags);
            }}
          />
        </div>
        <div className="w-full flex justify-end my-3">
          <Switch.Group>
            <Switch.Label
              className={clsx(
                "mr-1 font-bold sm:text-lg transition-all",
                isAlram ? " text-primary " : "text-neutral"
              )}
            >
              망각곡선 알림
            </Switch.Label>
            <Switch
              checked={isAlram}
              className={`${
                isAlram ? "bg-primary" : "bg-neutral"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
              {...(register("isAlram"), {})}
              onChange={() => {
                setValue("isAlram", !isAlram);
              }}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  isAlram ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </Switch.Group>
        </div>
        <div>
          <ReactQuill
            theme="snow"
            ref={editorRef}
            value={content}
            modules={modules}
            formats={formats}
            placeholder="복습할 내용을 적어보세요"
            style={{
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
            {...(register("content", {
              required: "글 내용을 입력해 주세요",
              minLength: {
                value: 10,
                message: "최소 10글자 이상 입력해야 합니다.",
              },
            }),
            {})}
            onChange={(value) => {
              setValue("content", value === "<p><br></p>" ? "" : value);
            }}
          />
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.content?.message}
            </span>
          </label>
        </div>
        <div
          className="w-full flex flex-col gap-y-2 gap-x-2
        lg:flex-row lg:justify-end
        "
        >
          <button
            type="button"
            className="w-full btn btn-outline btn-primary 
            lg:btn-wide lg:hidden"
            onClick={() => onOpen(myStudyData)}
          >
            미리보기
          </button>
          <button
            type="submit"
            className="w-full btn btn-primary text-white
            lg:btn-wide lg:hidden
            "
          >
            {btnName}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudyForm;
