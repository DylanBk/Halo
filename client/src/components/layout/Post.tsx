import { Bookmark, Heart, Share2, Repeat2, User } from 'lucide-react';
import PostProps from '../../types/post'

const Post = (props: PostProps) => {

    const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {};

    const handleRepost = async (e: React.MouseEvent<HTMLButtonElement>) => { };
    
    const handleShare = async (e: React.MouseEvent<HTMLButtonElement>) => { };
    
    const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => { };
    
    const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const comment = (e.currentTarget.children[0] as HTMLTextAreaElement).value;
            const formData = {
                comment: comment as string
            };

            const req = await fetch('/api/comment/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const res = await req.json();

            console.log(res);
        } catch(e) {
            console.error(`Error posting comment: ${e}`);
        };
    };

    return (
        <section className="w-full flex flex-col gap-2 p-4 rounded-md bg-surface text-snow">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row gap-1 items-center">
                    <User
                        className='border border-steel rounded-full bg-lichen'
                        size={28}
                    />

                    <p className='font-bold'>{props.author}</p>
                </div>

                <p className='text-sm text-smoke'>{props.created_at}</p>
            </div>

            <p>{props.content}</p>

            <div className="w-full flex flex-row gap-3 sm:gap-4">
                <button
                    className="flex flex-row items-center"
                    onClick={handleLike}>
                    <Heart
                        className='fill-surface hover:fill-rose hover:stroke-rose icon'
                        size={20}
                    />
                    <p className='text-smoke'>{props.likes}</p>
                </button>

                <button
                    className="flex flex-row items-center"
                    onClick={handleRepost}>
                    <Repeat2
                        className='hover:stroke-jade icon'
                        size={20}
                    />
                    <p className='text-smoke'>{props.reposts}</p>
                </button>

                <button
                    className="flex flex-row items-center"
                    onClick={handleShare}>
                    <Share2
                        className='fill-surface hover:fill-marine hover:stroke-marine icon'
                        size={20}
                    />
                    <p className='text-smoke'>{props.shares}</p>
                </button>

                <button
                    className="flex flex-row items-center ml-auto"
                    onClick={handleSave}>
                    <Bookmark
                        className='fill-surface hover:fill-marine hover:stroke-marine icon'
                        size={20}
                    />
                    <p className='text-smoke'>{props.saves}</p>
                </button>
            </div>

            <form className='w-full flex flex-row' onSubmit={handleComment}>
                <textarea
                    name="comment"
                    className='min-h-8 max-h-44 w-full field-sizing-content p-0.5 rounded-l-lg border border-surface-muted focus-visible:border-smoke outline-none'
                    placeholder='Type your comment...'
                    maxLength={400}
                    aria-label='Reply to this post'
                />
                <button
                    className='min-h-max p-1 rounded-r-lg bg-surface-muted text-smoke hover:text-snow'
                    type='submit'>
                    Reply
                </button>
            </form>
        </section>
    );
};

export default Post;