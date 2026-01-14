### 简介
RAG全称: 检索增强生成,被大量应用于基于AI的专业型知识场景
比如: 智能企业知识库、智能客服、竞品分析等等
本质上,它是LLM的一个外挂程序,是对LLM能力的补充
![RAG介绍](../截图/RAG介绍.png)

### LLM知识型缺陷
1、知识的静态性和幻觉问题
2、领域知识的专业性与深度不足问题
3、信息的溯源和可信度问题
![RAG解决方案](../截图/RAG解决方案.png)

### 实现RAG的步骤
1、索引Indexing: 需要将知识库以某种格式保存起来,方便后续匹配
2、检索Retrieval: 需要将用户的问题与之前建立的索引进行匹配,得到相关度较高的结果
3、生成Generation: 将匹配的知识和用户问题混合投递给LLM,从而得到准确的结果

### 索引Indexing
索引过程分为三步:
1、分割split
2、嵌入Embedding
定义: 嵌入的工作,是将一段文本变成一个多维向量的数学表达,为后续的检索提供便利
![嵌入Embedding](../截图/RAG-嵌入Embedding.png)
3、存储storage
存储嵌入结果通常使用向量数据库
小型项目(<10万向量): Chroma、pgvector、SQLite
中型应用(10万~1000万): Qdrant、Weaviate、Elasticsearch
大型系统(>1000万): Milvus、专用云服务

### 检索Retrieval
![RAG-检索Retrieval](../截图/RAG-检索Retrieval.png)

### 生成Generation
![RAG-生成Generation](../截图/RAG-生成Generation.png)
生成: 既是把检索结果和用户问题一起告知大模型
生成方法有很多,最常用、最简单的就是prompt
