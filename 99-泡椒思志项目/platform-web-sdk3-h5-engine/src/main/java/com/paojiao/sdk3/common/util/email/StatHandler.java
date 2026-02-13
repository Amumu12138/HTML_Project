package com.paojiao.sdk3.common.util.email;


import com.paojiao.sdk3.common.util.EmailSender;

import org.apache.log4j.Logger;

import java.util.Set;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class StatHandler {

    public static final org.apache.log4j.Logger log = Logger.getLogger(StatHandler.class);

    /**
     * 发送审核邮件
     */
    private static ThreadPoolExecutor sendReviewEmailPool = new ThreadPoolExecutor(2,
            10, 10 * 60, TimeUnit.SECONDS, new LinkedBlockingQueue<Runnable>());


    private class sendReviewEmail implements Runnable {
        private String subject;
        private Set<String> to;
        private String content;

        public sendReviewEmail(String subject, Set<String> to, String content) {
            this.subject = subject;
            this.to = to;
            this.content = content;
        }
        public void run() {
            EmailSender.sendEmail(subject, to, content);
        }
    }


    public void sendReviewEmail(String subject, Set<String> to, String content) {
        sendReviewEmailPool.execute(new sendReviewEmail(subject, to, content));
    }
}



