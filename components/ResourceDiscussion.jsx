'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { MessageSquare, Send, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function ResourceDiscussion({ resourceId }) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [discussions, setDiscussions] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchDiscussions = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/discussions?resourceId=${resourceId}`);
        if (!response.ok) throw new Error('Failed to fetch discussions');
        const data = await response.json();
        setDiscussions(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load discussions',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDiscussions();
  }, [resourceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      toast({
        title: 'Error',
        description: 'Please sign in to comment',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/discussions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment, resourceId }),
      });

      if (!response.ok) throw new Error('Failed to post comment');

      const newDiscussion = await response.json();
      setDiscussions([newDiscussion, ...discussions]);
      setNewComment('');
      
      toast({
        title: 'Success',
        description: 'Comment posted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to post comment',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Discussion
        </CardTitle>
      </CardHeader>
      <CardContent>
        {session && (
          <form onSubmit={handleSubmit} className="mb-6">
            <Textarea
              placeholder="Add to the discussion..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-2"
            />
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Post Comment
                </>
              )}
            </Button>
          </form>
        )}

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : discussions.length > 0 ? (
          <div className="space-y-4">
            {discussions.map((discussion) => (
              <div key={discussion.id} className="border-b pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold">{discussion.user_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(discussion.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">{discussion.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            No comments yet. Be the first to start the discussion!
          </p>
        )}
      </CardContent>
    </Card>
  );
}