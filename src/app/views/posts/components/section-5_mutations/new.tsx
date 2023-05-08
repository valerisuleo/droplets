/* eslint-disable @typescript-eslint/no-empty-function */
import { Fragment, useState } from 'react';
import ListGroup from '../../../../libs/list-group/list-group';
import usePosts from '../../hooks/usePosts';
import { IFormCtrl } from '../../../../libs/forms/hook/interfaces';
import { useReactiveForm } from '../../../../libs/forms/hook/useReactiveForm';
import useAddPost from '../../hooks/useAddPost';

const PostNew = () => {
    const { data: posts } = usePosts();

    const schema = {
        title: '',
    };

    const ctrls: IFormCtrl[] = [
        {
            type: 'text',
            name: 'title',
            label: '',
            validators: [],
            options: [],
            id: '1',
        },
    ];

    const [
        formGroup,
        errorValidation,
        handleChange,
        handleBlur,
        handleSubmit,
        renderInput,
        renderCheckbox,
        renderSelect,
    ] = useReactiveForm(schema, doSubmit);

    const addPost = useAddPost();

    function doSubmit() {
        addPost.mutate({
            body: '',
            id: 0,
            userId: 1,
            title: formGroup.title,
        });

        console.log(posts);
    }

    if (addPost.error) {
        return <p>{addPost.error.message}</p>;
    }

    return (
        <div>
            <h1>React Query: mutation</h1>
            {ctrls.length ? (
                <div className="d-inline-flex py-2">
                    {ctrls.map((controller: IFormCtrl) => (
                        <Fragment key={controller.id}>
                            {controller.type === 'text' ? (
                                <div className="input-group mb-3">
                                    {renderInput(
                                        controller,
                                        handleChange,
                                        handleBlur,
                                        formGroup,
                                        errorValidation
                                    )}
                                    <button
                                        onClick={handleSubmit}
                                        disabled={addPost.isLoading}
                                        className="btn btn-primary"
                                        type="button"
                                        id="button-addon2"
                                    >
                                        {addPost.isLoading
                                            ? 'Saving...'
                                            : 'Add'}
                                    </button>
                                </div>
                            ) : null}
                        </Fragment>
                    ))}
                </div>
            ) : null}
            {posts?.length && (
                <ListGroup
                    collection={posts}
                    propKey={'id'}
                    propText={'title'}
                    onEmitEvent={() => {}}
                />
            )}
        </div>
    );
};

export default PostNew;
