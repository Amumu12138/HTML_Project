package com.paojiao.sdk3.controller.thirdsdk;

/**
 * Created by ant on 2015/3/26.
 */
public interface HttpFutureCallback {

    public void completed(String content);

    public void failed(String err);

}
